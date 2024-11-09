import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface Props {
  userName: string;
  selectedGu: string;
  selectedCategory: string;
}

const IntroCard = ({ userName, selectedGu, selectedCategory }: Props) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              {`Challen-Day | Hello User ${userName}!`}
            </Typography>
            <Typography variant="h6" component="div">
              {`Today's challenge that you selected [${selectedGu}/${selectedCategory}] is ${'this'}!`}
            </Typography>
            <Typography variant="h6">
              {`Good Luck!`}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">{`Learn More`}</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
};
export default IntroCard;
