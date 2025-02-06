import React, { useState } from 'react';
import './EditNoteModal.css';

const EditNoteModal = ({ note, onSave, onClose }) => {
    const [editedDescription, setEditedDescription] = useState(note.description);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...note,
            description: editedDescription
        });
    };

    return (
        <div className="modal-backdrop">
            <div className="edit-modal">
                <div className="modal-header">
                    <h5>Edit Task</h5>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNoteModal; 