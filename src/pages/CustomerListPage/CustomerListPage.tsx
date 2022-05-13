import React from 'react'
import pluralize from 'pluralize';
import { Skeleton } from '@material-ui/lab'
import { formatNumber } from '@utils/number';
import { useTheme } from '@material-ui/core/styles';
import { useGetCustomerListQuery } from '@data/laravel/services/api';
import { CardActions, Chip, Grid, Typography } from '@material-ui/core';
import { Box, Card, CardContent, CardHeader, Container, } from '@material-ui/core'

function CustomerListPage() {
    const theme = useTheme();

    const {
        data: customers = {
            results: []
        },
        isLoading
    } = useGetCustomerListQuery()

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
                                : customers.results.map((customer, i) => (
                                    <Grid item xs={12} sm={6} md={4} key={customer.customer_id}>
                                        <Card square style={{ borderTop: "3px solid " + theme.palette.primary.main }}>
                                            <CardHeader
                                                title={`${customer.first_name} ${customer.last_name}`}
                                                titleTypographyProps={{
                                                    style: {
                                                        fontWeight: 700
                                                    }
                                                }}
                                                subheader={customer.email}
                                            />

                                            <CardContent>

                                                <Typography gutterBottom>
                                                    <strong>Total purchase count</strong>: {pluralize("time", customer.total_purchase_count, true)}
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <strong>Total purchase amount</strong>: {formatNumber(customer.total_purchase_amount, "en-US", { maximumSignificantDigits: 3, style: "currency", currency: "USD" })}
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <strong>Store</strong>: {customer.store}
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <strong>Phone</strong>: {customer.address.phone}
                                                </Typography>

                                                <Typography gutterBottom>
                                                    <strong>Address</strong>: {customer.address.address}
                                                </Typography>
                                                <Typography gutterBottom>
                                                    {customer.address.city}, {customer.address.country}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Chip color={customer.active ? "primary" : "secondary"} variant={"outlined"} key={i} label={customer.active ? "Active" : "Inactive"} />
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

export default CustomerListPage