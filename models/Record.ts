class Record {
  id: string;
  date: Date;
  totalWorkHours: number;
  overWorkHours: number;
  startWorkTime: Date;
  endWorkTime: Date;
  hasBreakTime: boolean;
  startBreakTime: Date;
  endBreakTime: Date;
  imageUri: string;

  constructor(
    id: string,
    date: Date,
    totalWorkHours: number,
    overWorkHours: number,
    startWorkTime: Date,
    endWorkTime: Date,
    hasBreakTime: boolean,
    startBreakTime: Date,
    endBreakTime: Date,
    imageUri: string
  ) {
    this.id = id;
    this.date = date;
    this.totalWorkHours = totalWorkHours;
    this.overWorkHours = overWorkHours;
    this.startWorkTime = startWorkTime;
    this.endWorkTime = endWorkTime;
    this.hasBreakTime = hasBreakTime;
    this.startBreakTime = startBreakTime;
    this.endBreakTime = endBreakTime;
    this.imageUri = imageUri;
  }
}

export default Record;
