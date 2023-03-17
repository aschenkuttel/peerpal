function dateFormat(timestamp) {
    const time = new Date(parseInt(timestamp) * 1000);
    const day = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // create a formatted date string using the day, month, and year
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

}

function linkifyTx(tx) {
    const txF = tx.substring(tx.length - 6, tx.length);
    return `0x...${txF}`;
}

export {
    dateFormat,
    linkifyTx
}