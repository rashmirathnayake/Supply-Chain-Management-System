import mysql from 'mysql2'

const db=mysql.createPool({
    host : "127.0.0.1",
    user: 'root',
    password:'12345678',
    database:'supply_chain'
}).promise()

//const result =await db.query("SELECT * FROM products")
//console.log(result)

export async function getProducts(){
    const [rows]= await db.query("SELECT * FROM product")
    return rows
}

export async function getRoute(){
    const [rows]= await db.query("SELECT * FROM route")
    return rows
}

export async function getUserType(name,Password){
    const [rows]= await db.query("SELECT Role_id, User_Id,name,Password  FROM users where name=? and Password=?", [name,Password])
    return rows
}

export async function getCustomer(id){

    const [rows]= await db.query("SELECT customer_id FROM customer where user_id=?", [id]);
    return rows
}

export async function toProductList(product_id,order_id,quantity){

 await db.query("INSERT INTO `product_list`(product_id,order_id,quantity) VALUES (?,?,?)", [product_id,order_id,quantity]);

}

export async function addorder(route_id,ordered_date,customer_id,expected_date,status,city){
 await db.query("INSERT INTO `order` ( route_id, ordered_date, customer_id, expected_date, status,city) VALUES (?, ?, ?, ?, ?, ?)", [ route_id, ordered_date, customer_id, expected_date, status,city])
  const [row]=  await db.query("SELECT LAST_INSERT_ID() as last_id");
  return row;
}

export async function allorders(user_id){

    const [rows] = await db.query("SELECT order_id,ordered_date,expected_date,Status FROM `ORDER` where Status ='Pending' order by expected_date;")
   return rows
}

export async function customer_view(user_id){

    const [rows] = await db.query("SELECT order_id,ordered_date,expected_date,Status FROM `ORDER` where customer_id IN (SELECT customer_id FROM customer where user_id=?)", [ user_id])
   return rows
}

export async function delivary_assignments(user_id){
    const [rows] = await db.query("SELECT delivery_id,truck_id,Status from `delivery assignments` where driver_id IN (SELECT driver_id from driver where user_id=? ) or driver_assist_id IN (SELECT driver_assist_id FROM `driver-assistant` where  user_id=? )", [ user_id,user_id]);
    
   return rows
}

export async function getDrivers(user_id){

    const [rows] = await db.query("SELECT driver_id from driver where store_id IN (SELECT store_id from `delivery manager` where user_id=? );", [ user_id])
   return rows
}

export async function getDriverAssistants(user_id){

    const [rows] = await db.query("SELECT driver_assist_id as assist_id from `driver-assistant` where store_id  IN (SELECT store_id from `delivery manager` where user_id=? );", [ user_id])
   return rows
}

export async function getTrucks(user_id){

    const [rows] = await db.query("SELECT truck_id from truck where store_id IN  (SELECT store_id from `delivery manager` where user_id=? );", [ user_id])
   return rows
}

export async function getDeliveryId(user_id){

    const [rows] = await db.query("SELECT delivery_id FROM `delivery assignments` WHERE delivery_id IN (SELECT delivery_id FROM delivery WHERE store_id IN (SELECT store_id FROM `delivery manager` WHERE user_id = ?)) AND status  ='Out For Delivery';", [ user_id])
   return rows
}



export async function valid_driver_assistant(driverAssist_id, user_id, date){
    console.log("adding");
    const [rows] = await db.query("SELECT valid_driverAssist(?,?,?)",[driverAssist_id, user_id, date]);
    return rows
}

///valid driver returns boolean true or false
export async function valid_driver(driver_id, user_id, date){
     const [rows] = await db.query("SELECT  valid_driver(?,?,?)",[driver_id, user_id, date]);
    return rows
}

export async function setDeliveryAssignment(truck_id,driver_id,driver_assist_id,date,delivery_id){
     console.log(truck_id,driver_assist_id,driver_id,date,delivery_id)
    await db.query("UPDATE `delivery assignments` set truck_id =? , driver_id=?,  driver_assist_id=?,date=?,status=? where delivery_id=?", [ truck_id,driver_id,driver_assist_id,date,"on delivery",delivery_id])
 
}

export async function add_tripId(trip_id, date,capa,strtStation){
    console.log("new trip database")
    const [rows] = await db.query("insert into train_schedule values(?,?,?,?,?)",[trip_id, date,capa,0,strtStation])

    return rows
}

export async function viewtrainShedule(){
    console.log("shedule");
    const [rows]= await db.query(" SELECT * FROM `train_schedule` order by date")
    return rows
}

export async function set_Deliveries(order_id){
    console.log("adding");
    const [rows] = await db.query("SELECT add_orderID(?)",[order_id]);
    return rows
}

export async function view_customer_id(){
    
    const [rows] = await db.query("Select customer_id from customer")

    return rows
}

export async function sec_04_report(customer_id){
    
    const [rows] = await db.query("SELECT order_id,product_id,product.Name,ordered_date,Address FROM `order` JOIN customer USING (customer_id) JOIN users USING (user_id) JOIN product_list USING (order_id) JOIN product USING (product_id) WHERE customer_id = ? order by order_id",[customer_id])

    return rows
}

export async function sec_02_report(){
    
    const [rows] = await db.query("SELECT product_id, SUM(quantity) AS quantity FROM product_list GROUP BY product_id ORDER BY SUM(quantity) DESC LIMIT 5;")

    return rows
}
export async function view_Driver_id(){
    
    const [rows] = await db.query("select driver_id from driver")

    return rows
}
export async function view_Driver_assist_id(){
    
    const [rows] = await db.query("select driver_assist_id from `driver-assistant`")

    return rows
}

export async function view_truck_id(){
    
    const [rows] = await db.query("select truck_id from truck order by truck_id")

    return rows
}

export async function driver_report(driver_id){
    
    const [rows] = await db.query("SELECT time_duration  FROM `delivery assignments` JOIN (SELECT * 	FROM delivery	JOIN order_list USING (delivery_id) ) AS subquery1 USING (delivery_id) JOIN (SELECT * FROM `order` JOIN route USING (route_id) ) AS subquery2 USING (order_id) WHERE driver_id = ?;",[driver_id])

    return rows
}
export async function driver_assist_report(driver_assist_id){
    
    const [rows] = await db.query("SELECT time_duration FROM `delivery assignments` JOIN ( (SELECT * FROM `delivery` JOIN `order_list` USING (delivery_id)) AS subquery_1    JOIN (SELECT * FROM `order` JOIN `route` USING (route_id)) AS subquery_2) USING (delivery_id)  WHERE driver_assist_id = ?;",[driver_assist_id])

    return rows
}

export async function sec_01_first_quater_report(year){
    const start=year + "-01-01"
    const end=year+"-04-01"
    const [rows] = await db.query("SELECT  Name, SUM(quantity) AS quantity FROM product_list JOIN product USING (product_id) JOIN `order` USING (order_id) WHERE ordered_date BETWEEN ? AND ? GROUP BY (product_id)",[start,end])
    console.log(rows)
    return rows
}
export async function sec_01_second_quater_report(year){
    const start=year + "-04-01"
    const end=year+"-07-01"
   
    const [rows] = await db.query("SELECT  Name, SUM(quantity) AS quantity FROM product_list JOIN product USING (product_id) JOIN `order` USING (order_id) WHERE ordered_date BETWEEN ? AND ? GROUP BY (product_id)",[start,end])
    console.log(rows)
    return rows
}
export async function sec_01_third_quater_report(year){
    
    const start=year + "-07-01"
    const end=year+"-10-01"
    const [rows] = await db.query("SELECT Name, SUM(quantity) AS quantity FROM product_list JOIN product USING (product_id) JOIN `order` USING (order_id) WHERE ordered_date BETWEEN ? AND ? GROUP BY (product_id)",[start,end])
    console.log(rows)
    return rows
}
export async function sec_01_fourth_quater_report(year){
    
    const start=year + "-10-01"
    const end=year+"-12-31"
    
    const [rows] = await db.query("SELECT  Name, SUM(quantity) AS quantity FROM product_list JOIN product USING (product_id) JOIN `order` USING (order_id) WHERE ordered_date BETWEEN ? AND ? GROUP BY (product_id)",[start,end])
    
    return rows
}