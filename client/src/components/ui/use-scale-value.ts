import { useState, useRef, useEffect } from "react";

export const useScaleValue = () => {
    const [scaleValue, setScaleValue] = useState(1);

    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // Function to calculate the appropriate scale factor
        const calculateScaleFactor = () => {
            if (!containerRef.current || !imageRef.current) return;
            if (!imageRef.current.complete || !imageRef.current.naturalWidth)
                return;

            const container = containerRef.current;
            const image = imageRef.current;

            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;

            // This is the displayed height of the image when height is 100%
            const displayedHeight = containerHeight;

            // This is what the width would be at that height, maintaining aspect ratio
            const naturalAspectRatio = image.naturalWidth / image.naturalHeight;
            const displayedWidth = displayedHeight * naturalAspectRatio;

            // Calculate scale needed to make the image at least cover the container width
            if (displayedWidth < containerWidth) {
                // Image is too narrow, scale up to cover container width
                const requiredScale = containerWidth / displayedWidth;
                setScaleValue(requiredScale);
            } else {
                // Image already covers container width
                setScaleValue(1);
            }
        };

        // Check when image loads and on resize
        const handleImageLoad = () => calculateScaleFactor();
        const handleResize = () => calculateScaleFactor();

        window.addEventListener("resize", handleResize);

        if (imageRef.current) {
            if (imageRef.current.complete) {
                calculateScaleFactor();
            }
            imageRef.current.addEventListener("load", handleImageLoad);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            if (imageRef.current) {
                imageRef.current.removeEventListener("load", handleImageLoad);
            }
        };
    }, []);

    return {
        scaleValue,
        containerRef,
        imageRef,
    };
};
