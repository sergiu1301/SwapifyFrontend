import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, Typography, Paper } from "@mui/material";

type Feature = {
    icon: React.ReactNode;
    title: string;
    description: string;
};

interface Props {
    features: Feature[];
}

const FeatureCarousel: React.FC<Props> = ({ features }) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1
        },
    };
    return (
        <Carousel
            swipeable={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            customTransition="transform 700ms ease-in-out"
            transitionDuration={600}
            containerClass="carousel-container"
            responsive={responsive}
            infinite={true}
        >
            {features.map((feature, i) => (
                <Paper
                    key={i}
                    elevation={3}
                    sx={{
                        height: "175px",
                        borderRadius: 4,
                        p: "12px 8px",
                        mb: 1,
                        mt: 1,
                        textAlign: "center",
                        mx: 1.5,
                        "&:hover": {
                            boxShadow: "0 0 15px rgba(0,0,0,0.2)",
                        },
                    }}
                >
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {feature.description}
                    </Typography>
                </Paper>
            ))}
        </Carousel>

    );
};

export default FeatureCarousel;
