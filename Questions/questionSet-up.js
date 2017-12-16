function QnA(q, a1, a2, a3, a4, ans){
    if (this instanceof QnA){
        this.q = q;
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
        this.a4 = a4;
        this.ans = ans;
        this.checkAnswer = function(chosen){
            if (chosen === this.ans || chosen === this.ans || chosen === this.ans || chosen === this.ans){
                return true;
            }
            else{
                return false; 
            }
        }
    }
    else{
        return new QnA(q, a1, a2, a3, a4, ans);
    }    
}
module.exports = QnA;