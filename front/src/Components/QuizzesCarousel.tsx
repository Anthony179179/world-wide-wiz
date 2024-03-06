import { useState } from "react";
import { Grid, IconButton, Container } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { QuizScore } from "./utils";

interface QuizzesCarouselProps {
  quizzes: QuizScore[];
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
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h5">{quizzes.name}</Typography>
                      <Typography variant="body1">
                        Description: {quizzes.description}
                      </Typography>
                      <Typography variant="body1">
                        Score: {quizzes.score}
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
