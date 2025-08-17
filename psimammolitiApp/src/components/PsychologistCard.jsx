import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from "@mui/material";

export default function PsychologistCard({ psycho, selected, onSelect }) {
  return (
    <Card variant={selected ? "elevation" : "outlined"} sx={{ height: "100%" }}>
      <CardActionArea onClick={() => onSelect(psycho)} sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>{psycho.name}</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {psycho.topics.map(t => (
              <Chip key={t} label={t} size="small" />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
