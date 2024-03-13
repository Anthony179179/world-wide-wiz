import { useState } from "react";
import { Grid, IconButton, Container } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
} from "@mui/material";
import { QuizzesWithScoresLinks } from "./utils";

interface QuizzesCarouselProps {
  quizzes: QuizzesWithScoresLinks[];
}
function QuizzesCarousel({ quizzes }: QuizzesCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);

  const scrollLeft = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  const scrollRight = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 3, quizzes.length));
  };

  return (
    <Container maxWidth="lg" sx={{ margin: 0 }}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item>
          <IconButton onClick={scrollLeft} disabled={startIndex === 0}>
            <ArrowBackIos />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={2}>
            {quizzes.slice(startIndex, startIndex + 3).map((quizzes) => (
              <Grid key={quizzes.quizid} item xs={4}>
                <Card sx={{ height: "100%" }}>
                  <CardActionArea href={quizzes.link}>
                    <CardContent>
                      <Typography variant="h5">{quizzes.name}</Typography>
                      <Box borderBottom={1} mt={1} mb={1} />
                      <Typography variant="body1">
                        Description: {quizzes.description}
                      </Typography>
                      <Typography variant="body1">
                        Your Score: {quizzes.score}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <IconButton
            onClick={scrollRight}
            disabled={startIndex >= quizzes.length - 3}
          >
            <ArrowForwardIos />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default QuizzesCarousel;
