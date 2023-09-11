data =
  "$$H157,013227009650882,AAA,33,-32.722396,-61.865563,230823121840,A,9,15,82,136,1,82,26326520,29159639,722|310|04DA|53D3,0000,0001|0002|0000|0A4B|0883,,,1,0000*7D";

let modifier = (data) => {
  let protocolData = data.split(",");
  const meitrackProtocol = {
    header: protocolData[0],
    headerFromTracker: protocolData[1],
    imei: protocolData[1],
    commandType: protocolData[2],
    eventCode: protocolData[3],
    latitude: protocolData[4],
    longitude: protocolData[5],
    dateTime: protocolData[6],
    gpsStatus: protocolData[7],
    numSatellites: protocolData[8],
    gsmSignalStatus: protocolData[9],
    speed: protocolData[10],
    direction: protocolData[11],
    horizontalAccuracy: protocolData[12],
    altitude: protocolData[13],
    mileage: protocolData[14],
    runTime: protocolData[15],
    baseStationInfo: protocolData[16],
    ioPortStatus: protocolData[17],
    analogInputValues: protocolData[18],
    rfid: protocolData[19],
    pictureName: protocolData[20],
    fenceNumber: protocolData[21],
    temperatureSensorNo: protocolData[22],
    customizedData: protocolData[23],
    protocolVersion: protocolData[24],
    fuelPercentage: protocolData[25],
    temperatureSensorValues: protocolData[26],
    checkCode: protocolData[27],
    endMarker: protocolData[28],
  };
  console.log(meitrackProtocol);
};

modifier(data);
