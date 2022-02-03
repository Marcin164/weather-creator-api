export default class Helper{
  private day:number
  private month:number
  private year:number
  private numberOfDay:number

    constructor(day:number, month:number, year:number, numberOfDay:number){
        this.day = day
        this.month = month
        this.year = year
        this.numberOfDay = numberOfDay
    }

    changeMonthAndYear = () => {
        let controlDay = this.day + this.numberOfDay
        if (this.month == 1 || this.month == 3 || this.month == 5 || this.month == 7 || this.month == 8 || this.month == 10 || this.month == 12) {
            if (controlDay > 31) {
              controlDay = 1;
        
              if(this.month + 1 > 12){
                this.month = 1
                this.year += 1
              }else{
                this.month+=1
              }
        
            }
          }
          if (this.month == 4 || this.month == 6 || this.month == 9 || this.month == 11) {
            if (controlDay > 30) {
              controlDay = 1;
              
              if(this.month + 1 > 12){
                this.month = 1
                this.year += 1
              }else{ 
                this.month+=1
              }
        
            }
          }
          if (this.month == 2) {
            if ((0 == this.year % 4 && 0 != this.year % 100) || 0 == this.year % 400) {
              if (controlDay > 29) {
                controlDay = 1;
        
                if(this.month + 1 > 12){
                  this.month = 1
                  this.year += 1
                }else{
                  this.month+=1
                }
        
              }
            } else {
              if (controlDay > 28) {
                controlDay = 1;
        
                if(this.month + 1 > 12){
                  this.month = 1
                  this.year += 1
                }else{
                  this.month+=1
                }
        
              }
            }
        }

        return {year: this.year, month:this.month, day:controlDay}
    }
}