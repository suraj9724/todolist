import React, { useState, useContext } from 'react';
import noteContext from '../context/notecontext';

// Component for adding a new note
const AddNote = ({ onClose }) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", dueDate: "" }); // Added title to state
    const [error, setError] = useState("");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedDate = new Date(note.dueDate);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
            setError("Due date cannot be in the past.");
            return;
        }

        setError("");
        addNote(note.title.trim(), note.description.trim(), note.dueDate); // Call addNote with title
        setNote({ title: "", description: "", dueDate: "" }); // Reset note state
        onClose();
    };

    // Handle input changes
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="card-title mb-4">Add a New Task</h4>
                                <button onClick={onClose} className="btn-close" aria-label="Close"></button>
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label> {/* New title label */}
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={note.title}
                                        onChange={onChange}
                                        required
                                        placeholder="Enter title"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={note.description}
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                        rows="3"
                                        placeholder="Enter description (min 5 characters)"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dueDate"
                                        name="dueDate"
                                        value={note.dueDate}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4"
                                        disabled={note.description.length < 5}
                                    >
                                        Add Note
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNote;
