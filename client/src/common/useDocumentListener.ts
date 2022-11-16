import { DependencyList, useEffect } from "react";

export const useWindowListener = <K extends keyof WindowEventMap>(
    eventListenerTypes: K | K[],
    callback: (this: Window, ev: WindowEventMap[K]) => any, // eslint-disable-line
    deps: DependencyList,
    options?: AddEventListenerOptions
): void => {
    // On event listener types or callback change, append event listeners to window
    // and remove stale event listeners.
    useEffect(() => {
        if (Array.isArray(eventListenerTypes)) {
            eventListenerTypes.forEach((eventListenerType) => {
                window.addEventListener(eventListenerType, callback, options);
            });
        } else {
            window.addEventListener(eventListenerTypes, callback, options);
        }

        // Remove stale event listeners on unmount.
        return (): void => {
            if (Array.isArray(eventListenerTypes)) {
                eventListenerTypes.forEach((eventListenerType) => {
                    window.removeEventListener(eventListenerType, callback);
                });
            } else {
                window.removeEventListener(eventListenerTypes, callback);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventListenerTypes, callback, ...deps, options]);
};
