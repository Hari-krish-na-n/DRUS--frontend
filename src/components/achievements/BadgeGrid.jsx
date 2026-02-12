// src/components/achievements/BadgeGrid.jsx
import React from "react";
import {
    Grid,
    Box,
    Tabs,
    Tab,
    TextField,
    MenuItem,
    InputAdornment,
    FormControl,
    Select,
    InputLabel
} from "@mui/material";
import { Search, Filter, SortAsc } from "lucide-react";
import BadgeCard from "./BadgeCard";

const BadgeGrid = ({
    badges = [],
    activeCategory = 'all',
    onCategoryChange,
    searchQuery = '',
    onSearchChange,
    sortBy = 'rarity',
    onSortChange
}) => {
    return (
        <Box>
            {/* Filters & Search */}
            <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                <Tabs
                    value={activeCategory}
                    onChange={(e, v) => onCategoryChange(v)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', minWidth: 80, fontSize: '0.85rem' },
                    }}
                >
                    <Tab label="All" value="all" />
                    <Tab label="Earned" value="earned" />
                    <Tab label="Progress" value="progress" />
                    <Tab label="Milestones" value="milestone" />
                    <Tab label="Competitive" value="competitive" />
                    <Tab label="Learning" value="learning" />
                    <Tab label="Rare" value="rare" />
                </Tabs>

                <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', md: 'auto' }, alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="Search badges..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        sx={{
                            width: { xs: '100%', md: 220 },
                            '& .MuiOutlinedInput-root': { borderRadius: 3 }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={16} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl size="small" sx={{ minWidth: 130 }}>
                        <Select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            sx={{ borderRadius: 3, fontWeight: 700, fontSize: '0.85rem' }}
                            startAdornment={<SortAsc size={16} style={{ marginRight: 8, opacity: 0.6 }} />}
                        >
                            <MenuItem value="rarity">High Rarity</MenuItem>
                            <MenuItem value="date">Recent</MenuItem>
                            <MenuItem value="name">Name A-Z</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {/* Grid */}
            <Grid container spacing={3}>
                {badges.length === 0 ? (
                    <Grid item xs={12}>
                        <Box sx={{ py: 10, textAlign: 'center', opacity: 0.5 }}>
                            <Typography variant="body1">No badges found in this category.</Typography>
                        </Box>
                    </Grid>
                ) : (
                    badges.map((badge) => (
                        <Grid item xs={12} sm={6} md={4} key={badge.id}>
                            <BadgeCard badge={badge} />
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default BadgeGrid;
