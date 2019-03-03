export class FuntionComponent {
    getTruckData(){
        // document.addEventListener('DOMContentLoaded', event => {
            const app = firebase.app();
            const db = firebase.firestore();
            const truck1 = db.collection('trucks').doc('truck1');
            truck1.onSnapshot( doc => {
                const data = doc.data()
                // document.write(data)
                console.log(data);
                this.prop = data
            }  
                )
        // })
    }
}