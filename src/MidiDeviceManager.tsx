import React, { useState, useEffect } from 'react';
import MidiConnectionStatus from './MidiConnectionStatus';
import MidiMessageViewer from './MidiMessageViewer';

const MidiDeviceManager: React.FC = () => {
  const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<WebMidi.MIDIInput | null>(null);
  const [deviceList, setDeviceList] = useState<WebMidi.MIDIInput[]>([]);

  const requestMIDIAccess = async () => {
    if (!navigator.requestMIDIAccess) {
      console.log('WebMIDI is not supported in this browser.');
      return;
    }
  
    try {
      const access = await navigator.requestMIDIAccess();
      setMidiAccess(access);
  
      let inputs: WebMidi.MIDIInput[] = [];
      access.inputs.forEach((input) => {
        inputs.push(input);
      });
      setDeviceList(inputs);
    } catch (err) {
      console.log('Could not access the MIDI devices.');
    }
  };
  

  useEffect(() => {
    requestMIDIAccess();
  }, []);

  useEffect(() => {
    if (!midiAccess) return;

    const updateDevices = () => {
      let inputs: WebMidi.MIDIInput[] = [];
      midiAccess.inputs.forEach((input) => {
        inputs.push(input);
      });
      setDeviceList(inputs);
    };

    midiAccess.onstatechange = updateDevices;
  }, [midiAccess]);

  const handleDeviceSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const device = deviceList.find((device) => device.id === id);
    setSelectedDevice(device || null);
  };

  return (
    <div>
      <select onChange={handleDeviceSelection}>
        <option>Select a device...</option>
        {deviceList.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name}
          </option>
        ))}
      </select>
      <button onClick={requestMIDIAccess}>Re-connect</button>
      <MidiConnectionStatus selectedDevice={selectedDevice} />
      {selectedDevice && <MidiMessageViewer device={selectedDevice} />}
    </div>
  );
};

export default MidiDeviceManager;
