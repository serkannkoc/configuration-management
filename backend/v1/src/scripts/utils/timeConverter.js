const formatDate = (timestamp) => {
    const date = new Date(timestamp.toMillis());
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

module.exports = {
    formatDate,
}