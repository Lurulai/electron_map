function signalStrengthImage(signal) {
    console.log(signal)
    if (signal == 1) {
        return 'imgs/connect-1bar.png';
    } else if (signal == 2) {
        return 'imgs/connect-2bar.png';
    } else if (signal == 3) {
        return 'imgs/connect-3bar.png';
    }
    return 'imgs/connect-none.png';
}