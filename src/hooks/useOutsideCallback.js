import { useEffect } from "react";

export const useOutsideCallback = (callback, ref) => {
    useEffect(() => {
        const handleClickOutside = e => {
            if (ref.current && !ref.current.contains(e.target))
                callback();
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
}

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
    })
}