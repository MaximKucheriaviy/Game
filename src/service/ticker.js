export const tick = (lastUpdate, updateTimer) => {
    if(Date.now() - lastUpdate > updateTimer){
        return true;
    }
}