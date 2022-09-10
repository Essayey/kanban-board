import { useEffect } from "react";

export const useOutsideCallback = (callback, ref) => {
    useEffect(() => {
        const handleClickOutside = e => {
            if (ref.current && !ref.current.contains(e.target))
                callback();
        }

        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [callback, ref]);
}
