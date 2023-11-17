const sortByDate = (a, b) => b.filmInfo.release.date - a.filmInfo.release.date;

const sortByRating = (a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating;

export { sortByDate, sortByRating };
