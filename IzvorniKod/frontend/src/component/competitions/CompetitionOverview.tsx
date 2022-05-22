import React from "react";
import {makeStyles, Theme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {useParams} from "react-router-dom";
import {CompetitionOverviewInformation} from "./CompetitionOverviewInformation";
import {ClubTableData} from "./ClubTableData";
import {CompetitionScheduledMatches} from "./CompetitionScheduledMatches";
import {CompetitionPlayedMatches} from "./CompetitionPlayedMatches";
import {Grid} from "@material-ui/core";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {/* TODO Typography??*/}
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));


export const CompetitionOverview = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const {competitionId} = useParams();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container>
            <Grid item xs={2}>

                <Tabs
                    orientation="vertical"
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="Competition overview menu"
                    className={classes.tabs}
                >
                    <Tab label="O natjecanju" {...a11yProps(0)} />
                    <Tab label="Tablica" {...a11yProps(1)} />
                    <Tab label="Odigrane utakmice" {...a11yProps(2)} />
                    <Tab label="Raspored utakmica" {...a11yProps(3)} />
                </Tabs>

            </Grid>

            <Grid item xs={10}>

                <TabPanel value={value} index={0}>
                    {competitionId && <CompetitionOverviewInformation competitionId={competitionId!}/>}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {competitionId && <ClubTableData competitionId={competitionId!}/>}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {/* CompetitionId is defined, && is the next thing to do if it is defined, if it is not nothing happens/renders */}
                    {competitionId && <CompetitionPlayedMatches competitionId={competitionId!}/>}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {/* CompetitionId is defined, && is the next thing to do if it is defined, if it is not nothing happens/renders */}
                    {competitionId && <CompetitionScheduledMatches competitionId={competitionId!}/>}
                </TabPanel>
            </Grid>
        </Grid>
    );

};