import React, { useState, useEffect } from "react";
import {Box} from "@mui/material";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

interface Props {
    images: string[];
    autoRotateInterval?: number;
}

const ImageCoverflow: React.FC<Props> = ({ images, autoRotateInterval = 9000 }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const radius = 400;
    const angleStep = (2 * Math.PI) / images.length;

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, autoRotateInterval);

        return () => clearInterval(interval);
    }, [autoRotateInterval, images.length]);

    return (
        <Box
            style={{
                perspective: "1000px",
                width: "100%",
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "visible",
            }}
        >
            <Box
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                }}
            >
                {images.map((src, i) => {
                    const offset = ((i - activeIndex + images.length) % images.length);
                    const angle = offset * angleStep;

                    return (
                        <Box
                            key={i}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: `
                  translate(-50%, -50%)
                  translateX(${Math.sin(angle) * radius}px)
                  translateZ(${Math.cos(angle) * radius}px)
                `,
                                transition: "transform 0.8s ease",
                                zIndex: offset === 0 ? 10 : 1,
                            }}
                        >
                            <img
                                src={src}
                                alt={`carousel-${i}`}
                                style={{
                                    width: offset === 0 ? "320px" : "240px",
                                    height: offset === 0 ? "200px" : "160px",
                                    objectFit: "cover",
                                    borderRadius: "16px",
                                    border: "1px solid #ccc",
                                    boxShadow: offset === 0 ? `0 0 10px #e3b43e` : ``,
                                    transform: `
                                    scale(${offset === 0 ? 1 : 1})
                                    translateZ(${offset === 0 ? "100px" : "-100px"})
                                    rotateY(0deg)
                                  `,
                                    transition: "transform 0.8s ease, width 0.8s ease, height 0.8s ease, border 0.8s ease",
                                    zIndex: offset === 0 ? 10 : 1,
                                    backfaceVisibility: "hidden",
                                    pointerEvents: offset === 0 ? "auto" : "none",
                                }}
                            />
                        </Box>
                    );
                })}
            </Box>

            {/* Arrows */}
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    transform: "translateY(-50%)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 4,
                    pointerEvents: "none",
                }}
            >
                <Box
                    onClick={handlePrev}
                    sx={{
                        pointerEvents: "auto",
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "1.5rem",
                        "&:hover": {
                            backgroundColor: "rgba(227, 180, 62, 0.4)",
                        },
                    }}
                >
                    <ArrowBackIosRoundedIcon/>
                </Box>

                <Box
                    onClick={handleNext}
                    sx={{
                        pointerEvents: "auto",
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "1.5rem",
                        "&:hover": {
                            backgroundColor: "rgba(227, 180, 62, 0.4)",
                        },
                    }}
                >
                    <ArrowForwardIosRoundedIcon/>
                </Box>
            </Box>

            {/* Dots */}
            <Box
                style={{
                    position: "absolute",
                    bottom: "12px",
                    textAlign: "center",
                    width: "100%",
                }}
            >
                {images.map((_, i) => (
                    <span
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        style={{
                            display: "inline-block",
                            margin: "0 4px",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: i === activeIndex ? "#e3b43e" : "#888",
                            cursor: "pointer",
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default ImageCoverflow;
