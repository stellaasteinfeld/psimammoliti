import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from "@mui/material";

export default function PsychologistCard({ psycho, selected, onSelect }) {
  const hasOnline = (psycho.availability.online?.length ?? 0) > 0;
  const hasPresencial = (psycho.availability.presencial?.length ?? 0) > 0;

  return (
    <Card variant={selected ? "elevation" : "outlined"} sx={{ height: "100%" }}>
      <CardActionArea onClick={() => onSelect(psycho)} sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>{psycho.name}</Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
            {psycho.topics.map(t => <Chip key={t} label={t} size="small" />)}
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              label="Online"
              size="small"
              color={hasOnline ? "primary" : "default"}
              variant={hasOnline ? "filled" : "outlined"}
            />
            <Chip
              label="Presencial"
              size="small"
              color={hasPresencial ? "primary" : "default"}
              variant={hasPresencial ? "filled" : "outlined"}
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
