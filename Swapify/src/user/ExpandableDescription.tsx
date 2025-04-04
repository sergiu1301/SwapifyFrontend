import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

interface ExpandableTextProps {
    text: string;
    previewWords?: number;
}

const ExpandableDescription: React.FC<ExpandableTextProps> = ({ text, previewWords = 100 }) => {
    const [expanded, setExpanded] = useState(false);
    const [maxHeight, setMaxHeight] = useState<string | number>("0px");
    const contentRef = useRef<HTMLDivElement>(null);

    const words = text.trim().split(" ");
    const hasMore = words.length > previewWords;
    const previewText = words.slice(0, previewWords).join(" ");
    const hiddenText = words.slice(previewWords).join(" ");

    useEffect(() => {
        if (expanded && contentRef.current) {
            setMaxHeight(contentRef.current.scrollHeight + "px");
        } else {
            setMaxHeight("0px");
        }
    }, [expanded]);

    return (
        <Box sx={{ position: "relative" }}>
            <Typography variant="body1" color="text.secondary" component="span">
                {previewText}
                {hasMore && !expanded && "..."}
            </Typography>

            {hasMore && (
                <Box
                    ref={contentRef}
                    sx={{
                        maxHeight,
                        opacity: expanded ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.6s ease, opacity 0.6s ease",
                    }}
                >
                    <Typography variant="body1" color="text.secondary" component="span">
                        {" " + hiddenText}
                    </Typography>
                </Box>
            )}

            {hasMore && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        size="small"
                        variant="text"
                        onClick={() => setExpanded(!expanded)}
                        sx={{ textTransform: "none", fontWeight: 500 }}
                    >
                        {expanded ? "Show less" : "Read more"}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ExpandableDescription;
