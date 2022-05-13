import React from 'react'
import dayjs from 'dayjs';
import pluralize from 'pluralize'
import { Skeleton } from '@material-ui/lab'
import { formatNumber } from '@utils/number';
import { useTheme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { StyledTypography } from '@components/ui/system';
import { useGetSaleListQuery } from '@data/laravel/services/api';
import { useGetAnalyticsQuery } from '@data/laravel/services/analytics'
import { Avatar, Box, Card, CardContent, CardHeader, Container, } from '@material-ui/core'
import { AccountCircleOutlined, FaceOutlined, MonetizationOn, Movie } from '@material-ui/icons';

function DashboardPage() {
    const theme = useTheme();

    const { data: analytics, isLoading, } = useGetAnalyticsQuery()
    const { data: sales = {
        results: []
    }, isLoading: isSaleListLoading } = useGetSaleListQuery()

    return (
        <Container maxWidth={"xl"}>
            <Box mt={2}>
                <Grid container spacing={5}>
                    <Grid xs={12} sm={6} md={4} lg={3} item>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar variant={"rounded"}>
                                        <MonetizationOn />
                                    </Avatar>
                                }
                                title={"Total Sales"}
                                titleTypographyProps={{
                                    variant: "h6",
                                    style: {
                                        fontWeight: 700
                                    }
                                }}
                            // subheader={"(Last 30 days)"}
                            />
                            <CardContent>
                                <StyledTypography fontWeight={600} variant={"h5"}>
                                    {isLoading ? <Skeleton width={200} height={35} /> : formatNumber(analytics?.total_sales ?? 0, "en-US", { style: "currency", currency: "BDT" })}
                                </StyledTypography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid xs={12} sm={6} md={4} lg={3} item>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar variant={"rounded"}>
                                        <Movie />
                                    </Avatar>
                                }
                                title={"Total Films"}
                                titleTypographyProps={{
                                    variant: "h6",
                                    style: {
                                        fontWeight: 700
                                    }
                                }}
                            // subheader={"(Last 30 days)"}
                            />
                            <CardContent>
                                <StyledTypography fontWeight={600} variant={"h5"}>
                                    {isLoading ? <Skeleton width={200} height={35} /> : pluralize("film", analytics?.total_films ?? 0, true)}
                                </StyledTypography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid xs={12} sm={6} md={4} lg={3} item>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar variant={"rounded"}>
                                        <AccountCircleOutlined />
                                    </Avatar>
                                }
                                title={"Total Customers"}
                                titleTypographyProps={{
                                    variant: "h6",
                                    style: {
                                        fontWeight: 700
                                    }
                                }}
                            // subheader={"(Last 30 days)"}
                            />
                            <CardContent>
                                <StyledTypography fontWeight={600} variant={"h5"}>
                                    {isLoading ? <Skeleton width={200} height={35} /> : pluralize("person", analytics?.total_customers ?? 0, true)}
                                </StyledTypography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid xs={12} sm={6} md={4} lg={3} item>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar variant={"rounded"}>
                                        <FaceOutlined />
                                    </Avatar>
                                }
                                title={"Total Staves"}
                                titleTypographyProps={{
                                    variant: "h6",
                                    style: {
                                        fontWeight: 700
                                    }
                                }}
                            />
                            <CardContent>
                                <StyledTypography fontWeight={600} variant={"h5"}>
                                    {isLoading ? <Skeleton width={200} height={35} /> : pluralize("staff", analytics?.total_staves ?? 0, true)}
                                </StyledTypography>
                            </CardContent>
                        </Card>
                    </Grid>


                    <Grid item xs={12}>
                        <Grid container spacing={5}>
                            {isSaleListLoading ?
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
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                                : sales.results.map((sale, i) => (
                                    <Grid item xs={12} sm={6} md={4} key={sale.payment_id}>
                                        <Card square style={{ borderTop: "3px solid " + theme.palette.primary.main }}>
                                            <CardHeader
                                                title={sale.customer_name}
                                                titleTypographyProps={{
                                                    style: {
                                                        fontWeight: 700
                                                    }
                                                }}
                                                subheader={sale.customer_email}
                                            />

                                            <CardContent>
                                                <Typography gutterBottom>
                                                    <strong>Staff name</strong>: {sale.staff_name}
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <strong>Staff email</strong>: {sale.staff_email}
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <strong>Amount</strong>: {formatNumber(+(sale.amount), "en-US", { maximumSignificantDigits: 3, style: "currency", currency: "USD" })}
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <strong>Rental date</strong> : {dayjs(sale.rental.rental_date).format("DD/MM/YYYY")}
                                                </Typography>
                                                <Typography gutterBottom>
                                                    <strong>Return date</strong> : {dayjs(sale.rental.rental_date).format("DD/MM/YYYY")}
                                                </Typography>
                                                <Typography gutterBottom>
                                                    <strong>Payment date</strong> : {dayjs(sale.payment_date).format("DD/MM/YYYY")}
                                                </Typography>
                                            </CardContent>
                                            {/* <CardActions>
                                                <Button
                                                    size={"small"}
                                                    disableElevation
                                                    variant={"contained"}
                                                    style={{ backgroundColor: theme.palette.error.main, color: "white" }}
                                                >
                                                    Delete
                                                </Button>
                                            </CardActions> */}
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

export default DashboardPage