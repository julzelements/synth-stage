function Comment({ comment }) {
    return (
        <div>
            <h2>{comment.name}</h2>
            <h3>{comment.email}</h3>
            <p>{comment.body}</p>
        </div>
    );
}

function CommentsList({ comments }) {
    return (
        <div>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    );
}


async function getData() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
   
    return res.json();
  }


export default async function Page() {
  const data = await getData()

  return <CommentsList comments={data} />
}
