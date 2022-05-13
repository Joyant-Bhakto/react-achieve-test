import React from 'react'
import pluralize from 'pluralize';
import { Skeleton } from '@material-ui/lab'
import { formatNumber } from '@utils/number';
import { useTheme } from '@material-ui/core/styles';
import { useGetStaffListQuery } from '@data/laravel/services/api';
import { CardActions, Chip, Grid, Typography } from '@material-ui/core';
import { Box, Card, CardContent, CardHeader, Container, } from '@material-ui/core'

function StaffListPage() {
    const theme = useTheme();

    const {
        data: staffs = {
            results: []
        },
        isLoading
    } = useGetStaffListQuery()

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
                                            </CardContent>

                                            <CardActions>
                                                <Skeleton variant={"rect"} width={150} />
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                                : staffs.results.map((staff, i) => (
                                    <Grid item xs={12} sm={6} md={4} key={staff.staff_id}>
                                        <Card square style={{ borderTop: "3px solid " + theme.palette.primary.main }}>
                                            <CardHeader
                                                title={staff.username}
                                                titleTypographyProps={{
                                                    style: {
                                                        fontWeight: 700
                                                    }
                                                }}
                                                subheader={staff.email}
                                            />

                                            <CardContent>
                                                <Typography gutterBottom>
                                                    <strong>Store</strong>: {staff.store}
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <strong>Phone</strong>: {staff.address.phone}
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <strong>Address</strong>: {staff.address.address}
                                                </Typography>
                                                <Typography gutterBottom>
                                                    {staff.address.city}, {staff.address.country}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Chip color={staff.active ? "primary" : "secondary"} variant={"outlined"} key={i} label={staff.active ? "Active" : "Inactive"} />
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

export default StaffListPage