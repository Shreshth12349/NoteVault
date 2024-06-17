import {useContext, useState} from "react";
import { useAuthContext } from "./useAuthContext"; // Assumes you have this custom hook
import apiUrl from "../config";
import activeNoteContext from "../Contexts/ActiveNoteContext";

export const useNoteDelete = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { authState } = useAuthContext();
    const { user } = authState;

    const deleteNote = async (noteId) => {
        setIsLoading(true);
        setError(null);

        if (!user || !user.token) {
            setError("User is not authenticated");
            setIsLoading(false);
            return false;
        }

        try {
            const response = await fetch(`${apiUrl}/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete note');
            }

            setIsLoading(false);
            return true;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            return false;
        }
    };

    return { deleteNote, isLoading, error };
};

export default useNoteDelete;
