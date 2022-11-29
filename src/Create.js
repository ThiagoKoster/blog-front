import { useState } from "react";
import { useNavigate } from "react-router-dom"


const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const post = { title, body, author };

        fetch('http://localhost:8000/posts', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        }).then(() => {
            console.log('Posted!')
            setIsPending(false);
            navigate('/');
        })


    }

    return (
        <div className="create">
            <h2>Add a new post</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Content:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)} />
                <label>Author:</label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Post!</button>}
                {isPending && <button disabled>Posting...</button>}


            </form>
        </div>
    );
}

export default Create;