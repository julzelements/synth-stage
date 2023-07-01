"use client"
import React, { useState, useEffect } from "react";

const KorgKonnector: React.FC = () => {
  const [midiInput, setMidiInput] = useState<WebMidi.MIDIInput | null>(null);
  const [midiMessages, setMidiMessages] = useState<any[]>([]);

  const connectToMidiDevice = async () => {
    if (typeof window === 'undefined') {
      // We're in a server-side rendering context, exit
      return;
    }
    try {
      const access = await navigator.requestMIDIAccess();
      const inputs = Array.from(access.inputs.values());
      const desiredInput = inputs.find((input) => input.name === "monologue SOUND");
      if (desiredInput) {
        setMidiInput(desiredInput);
        desiredInput.onmidimessage = (message) => {
          setMidiMessages((prevMessages) => [...prevMessages, message.data]);
        };
      } else {
        console.error("MIDI input device not found");
      }
    } catch (error) {
      console.error("MIDI access request failed", error);
    }
  };

  return (
    <div>
      <h1>MIDI Output Component</h1>
      <button onClick={connectToMidiDevice}>Connect to MIDI Device</button>
      <ul>
        {midiMessages.map((message, index) => (
          <li key={index}>
            {message.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KorgKonnector;

