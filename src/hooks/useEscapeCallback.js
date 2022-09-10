import { useEffect } from "react";

export const useEscapeCallback = callback => {
    useEffect(() => {
        const handleEscape = e => {
            if (e.which === 27)
                callback();
        }
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [callback])
}