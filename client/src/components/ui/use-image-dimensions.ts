import { useState, useRef, useEffect } from "react";

export const useImageDimensions = (mobileOffset: number = 0) => {
    const [dimensions, setDimensions] = useState({
        containerHeight: "100vh",
        imageHeight: "100%",
        imageWidth: "100%",
        cropTop: 0,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const calculateDimensions = () => {
            if (!containerRef.current || !imageRef.current) return;
            if (!imageRef.current.complete || !imageRef.current.naturalWidth)
                return;

            const container = containerRef.current;
            const image = imageRef.current;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // On desktop (md breakpoint and up), use simple defaults without custom calculations
            if (viewportWidth >= 768) {
                setDimensions({
                    containerHeight: "100vh",
                    imageHeight: "100%",
                    imageWidth: "100%",
                    cropTop: 0,
                });
                return;
            }

            const naturalAspectRatio = image.naturalWidth / image.naturalHeight;
            const viewportAspectRatio = viewportWidth / viewportHeight;

            let containerHeight: string;
            let imageHeight: string;
            let imageWidth: string;
            let cropTop: number;

            if (naturalAspectRatio > viewportAspectRatio) {
                // Image is wider than viewport ratio - will be cropped horizontally
                const scaledImageHeight = viewportWidth / naturalAspectRatio;

                // Apply mobile offset to calculate crop amount from top
                const offsetAmount = (scaledImageHeight * mobileOffset) / 100;

                // Container height should show the full scaled image height minus the cropped portion
                const visibleHeight = scaledImageHeight - offsetAmount;
                containerHeight = `${visibleHeight}px`;

                // Image dimensions - keep full scaled height
                imageWidth = "100vw";
                imageHeight = `${scaledImageHeight}px`;

                // Crop from top by this amount
                cropTop = offsetAmount;
            } else {
                // Image is taller than viewport ratio - scale to fit width
                const scaledImageHeight = viewportWidth / naturalAspectRatio;

                // Apply mobile offset to calculate crop amount from top
                const offsetAmount = (scaledImageHeight * mobileOffset) / 100;

                // Container height should show the full scaled image height minus the cropped portion
                const visibleHeight = scaledImageHeight - offsetAmount;
                containerHeight = `${visibleHeight}px`;

                // Image dimensions - keep full scaled height
                imageWidth = "100vw";
                imageHeight = `${scaledImageHeight}px`;

                // Crop from top by this amount
                cropTop = offsetAmount;
            }

            setDimensions({
                containerHeight,
                imageHeight,
                imageWidth,
                cropTop,
            });
        };

        const handleImageLoad = () => calculateDimensions();
        const handleResize = () => calculateDimensions();

        window.addEventListener("resize", handleResize);

        const imageElement = imageRef.current;
        if (imageElement) {
            if (imageElement.complete) {
                calculateDimensions();
            }
            imageElement.addEventListener("load", handleImageLoad);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            if (imageElement) {
                imageElement.removeEventListener("load", handleImageLoad);
            }
        };
    }, [mobileOffset]);

    return {
        dimensions,
        containerRef,
        imageRef,
    };
};
