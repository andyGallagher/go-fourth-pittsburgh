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

            const naturalAspectRatio = image.naturalWidth / image.naturalHeight;
            const viewportAspectRatio = viewportWidth / viewportHeight;

            let containerHeight: string;
            let imageHeight: string;
            let imageWidth: string;
            let cropTop: number;

            if (naturalAspectRatio > viewportAspectRatio) {
                // Image is wider than viewport ratio - will be cropped horizontally
                // Set container height to what the image height would be when width = 100vw
                const scaledImageHeight = viewportWidth / naturalAspectRatio;

                // Apply mobile offset to reduce container height
                const offsetAmount = (scaledImageHeight * mobileOffset) / 100;
                containerHeight = `${scaledImageHeight - offsetAmount}px`;

                // Image should fill viewport width
                imageWidth = "100vw";
                imageHeight = `${scaledImageHeight}px`;

                // Calculate how much to crop from top
                cropTop = offsetAmount;
            } else {
                // Image is taller than viewport ratio - will be cropped vertically
                // Set container to viewport height minus offset
                const offsetAmount = (viewportHeight * mobileOffset) / 100;
                containerHeight = `${viewportHeight - offsetAmount}px`;

                // Image should fill viewport height
                imageHeight = "100vh";
                imageWidth = `${viewportHeight * naturalAspectRatio}px`;

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
