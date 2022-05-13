import React from 'react'
import { Skeleton } from '@material-ui/lab'
import Rating from '@material-ui/lab/Rating';
import { formatNumber } from '@utils/number';
import { useTheme } from '@material-ui/core/styles';
import { useGetFilmListQuery } from '@data/laravel/services/api';
import { CardActions, Chip, Grid, Typography } from '@material-ui/core';
import { Box, Card, CardContent, CardHeader, Container, } from '@material-ui/core'

function FilmListPage() {
    const theme = useTheme();

    const {
        data: films = {
            results: []
        }, isLoading
    } = useGetFilmListQuery()

    return (
        <Container maxWidth={"xl"}>
            <Box mt={2}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Grid container spacing={5}>
                            {isLoading ?
                                new Array(5).fill(0).map((_, i) => (
                                    <Grid item xs={12} sm={6} md={4} key={i} >
                                        <Card square style={{ borderTop: "3px solid " + theme.palette.primary.main }}>
                                            <CardHeader
                                                disableTypography
                                                title={<Skeleton width={150} />}
                                                subheader={<Skeleton width={250} />}
                                            />

                                            <CardContent>
                                                <Typography gutterBottom>
                                                    <Skeleton width={250} />
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <Skeleton width={350} />
                                                </Typography>


                                                <Typography gutterBottom>
                                                    <Skeleton width={250} />
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <Skeleton width={250} />
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <Skeleton width={250} />
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <Skeleton width={250} />
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <Skeleton width={250} />
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <Skeleton width={250} />
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <Skeleton width={250} />
                                                </Typography>
                                            </CardContent>

                                            <CardActions>
                                                {new Array(5).fill(0).map((_, i) => <Skeleton key={i} width={150} />)}
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                                : films.results.map((film, i) => (
                                    <Grid item xs={12} sm={6} md={4} key={film.film_id}>
                                        <Card square style={{ borderTop: "3px solid " + theme.palette.primary.main }}>
                                            <CardHeader
                                                title={film.title}
                                                titleTypographyProps={{
                                                    style: {
                                                        fontWeight: 700
                                                    }
                                                }}
                                                subheader={film.release_year}
                                            />

                                            <CardContent>
                                                <Typography gutterBottom>
                                                    <strong>Language</strong>: {film.language}
                                                </Typography>
                                                <Typography gutterBottom>
                                                    <strong>Release duration</strong>: {film.release_duration}
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <strong>Length</strong>: {film.length}
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <strong>Replacement cost</strong> : {formatNumber(+film.replacement_cost, "en-US", { maximumSignificantDigits: 3, style: "currency", currency: "USD" })}
                                                </Typography>
                                                <Typography gutterBottom>
                                                    <strong>Rating</strong> : {film.rating}
                                                </Typography>
                                                <Typography gutterBottom>
                                                    <strong>Special features</strong> : {film.special_features}
                                                </Typography>
                                                <Typography gutterBottom>
                                                    <strong>Actors</strong> : {film.actors.join(", ")}
                                                </Typography>
                                                <Typography gutterBottom>
                                                    <strong>Rental rate</strong> : <Rating name={"read-only"} value={+film.rental_rate} readOnly />
                                                </Typography>
                                                <Typography gutterBottom>
                                                    <strong>Description</strong> : {film.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                {film.categories.map((category, i) => <Chip color={"primary"} variant={"outlined"} key={i} label={category} />)}
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default FilmListPage