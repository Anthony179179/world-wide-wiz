import { useState } from "react";
import { Grid, IconButton, Container } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

function QuizzesGallery() {
  const [startIndex, setStartIndex] = useState(0);
  const cards = [
    {
      name: "Quiz 1",
      creator: "web",
      score: "100",
    },
    {
      name: "Quiz 2",
      creator: "web",
      score: "80",
    },
    {
      name: "Quiz 3",
      creator: "web",
      score: "90",
    },
    {
      name: "Quiz 4",
      creator: "user",
      score: "70",
    },
    {
      name: "Quiz 5",
      creator: "user",
      score: "100",
    },
  ];

  const scrollLeft = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  const scrollRight = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 3, cards.length));
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
            {cards
              .slice(startIndex, startIndex + 3)
              .map((card, index: number) => (
                <Grid key={index} item xs={4}>
                  <Card>
                    <CardActionArea>
                      <CardContent>
                        <Typography variant="h5">{card.name}</Typography>
                        <Typography variant="body1">
                          Creator: {card.creator}
                        </Typography>
                        <Typography variant="body1">
                          Score: {card.score}
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
            disabled={startIndex >= cards.length - 3}
          >
            <ArrowForwardIos />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default QuizzesGallery;
