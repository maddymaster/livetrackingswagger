/**
 * Created by Sudhir on 17/11/15.
 */
module.exports = {
    TrackMate:{
        starts:'^',
        ends:'#',
        delimiter:'|',
        dataProcessor:'TrackMate',
        criteria:{method:'startsWith',values:['^TMSRT','^TMPER','^TMALT']},
        packetTypes:{StartPacket:{method:'startsWith',
                                 value:'^TMSRT',
                                 columns:['TMSRT','DeviceID','Latitude','Longitude','Time','Date','SoftwareVersionNumber','HardwareVersionNumber']},
                    PeriodicPacket:{method:'startsWith',
                                    value:'^TMPER',
                                    columns:['TMPER','DeviceID','SequenceNumber','Latitude','Longitude','Time','Date','Speed','Heading','IgnitionStatus',
                                             'DigitalInput1Status','DigitalInput2Status','AnalogInput','InternalBatteyVoltage','VehicleBatteryVoltage',
                                             'GPSOdometerReading','PulseOdometerReading','MainPowerStatus','GPSDataValidityStatus','PacketLiveOrStoredStatus']},
                    AlertPacket:{method:'startsWith',
                                 value:'^TMALT',
                                 columns:['TMALT','DeviceID','SequenceNumber','AlertType','AlertStatusOrData','Latitude','Longitude','Time','Date','Speed','Heading']}}
    }
}
