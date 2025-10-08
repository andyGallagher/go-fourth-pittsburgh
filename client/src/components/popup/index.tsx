/* eslint-disable @next/next/no-img-element */
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { getImageProps } from "../../helpers/urlFor";
import { PortableText } from "@portabletext/react";
import { Button } from "components/ui/button";
import React, { useEffect, useState, useCallback } from "react";

export const Popup = ({ popup }: { popup: any }) => {
    const shouldDismissBeSaved = false;

    const [isVisible, setIsVisible] = useState(false);

    // Generate a consistent localStorage key
    const storageKey = `dismissedPopups107`;

    // Safe localStorage getter with error handling
    const getFromStorage = useCallback((key: string) => {
        try {
            return JSON.parse(localStorage.getItem(key) || "[]");
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            return [];
        }
    }, []);

    // Safe localStorage setter with error handling
    const saveToStorage = useCallback(
        (key: string, value: any) => {
            if (!shouldDismissBeSaved) {
                return;
            }

            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error("Error writing to localStorage:", error);
            }
        },
        [shouldDismissBeSaved]
    );

    useEffect(() => {
        if (!popup) {
            return;
        }

        // Check if this popup has been dismissed before
        const dismissedPopups = getFromStorage(storageKey);

        if (
            popup &&
            popup._id &&
            !dismissedPopups.includes(popup._id) &&
            popup.isLive
        ) {
            setIsVisible(true);
        }
    }, [popup, getFromStorage, storageKey]);

    const handleClose = useCallback(() => {
        // Add to dismissed popups in localStorage
        const dismissedPopups = getFromStorage(storageKey);

        if (popup && popup._id) {
            dismissedPopups.push(popup._id);
            saveToStorage(storageKey, dismissedPopups);
        }

        setIsVisible(false);
    }, []);

    // Handle ESC key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isVisible) {
                handleClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Focus trap - when popup is visible
        if (isVisible) {
            // Save previous active element
            const previousActiveElement = document.activeElement;

            // Return focus when unmounting
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
                if (
                    previousActiveElement &&
                    previousActiveElement instanceof HTMLElement
                ) {
                    previousActiveElement.focus();
                }
            };
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isVisible, handleClose]);

    if (!isVisible || !popup) return null;

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            role='dialog'
            aria-modal='true'
            aria-labelledby='popup-title'
        >
            <div
                className='absolute inset-0 bg-slate-900/70'
                onClick={handleClose}
            />
            <div className='relative bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden'>
                <div className='flex justify-end p-2'>
                    <button
                        className='[&_polygon]:fill-slate-600'
                        onClick={handleClose}
                        aria-label='Close popup'
                        autoFocus
                    >
                        <CloseIcon
                            style={{
                                width: "32px",
                                height: "32px",
                            }}
                        />
                    </button>
                </div>

                {popup.image && (
                    <div className='w-full'>
                        <img
                            alt={popup.title || "Popup image"}
                            {...getImageProps(popup.image)}
                            className='w-full h-auto'
                        />
                    </div>
                )}

                <div className='p-6 pt-2 text-center'>
                    {popup.title && (
                        <h2
                            className='text-2xl font-bold mb-2 text-slate-600'
                            id='popup-title'
                        >
                            {popup.title}
                        </h2>
                    )}

                    {popup.description && (
                        <div className='portable-text text-slate-600 mb-4'>
                            <PortableText value={popup.description} />
                        </div>
                    )}

                    {popup.buttons && popup.buttons.length > 0 && (
                        <div className='flex flex-col md:flex-row gap-4 mt-4 justify-center'>
                            {popup.buttons.map((button: any) => (
                                <a
                                    key={
                                        button._key || Math.random().toString()
                                    }
                                    href={button.url}
                                    className='block'
                                    target='_blank'
                                    rel='noreferrer noopener'
                                >
                                    <Button isInverted>{button.label}</Button>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
