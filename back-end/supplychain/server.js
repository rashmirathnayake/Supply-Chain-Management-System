import express from 'express'
import { getProducts,
         getUserType , 
         getRoute,
         addorder,
         getCustomer,
         toProductList,
         customer_view,
         delivary_assignments,
         getDriverAssistants,
         getDrivers,
         getTrucks,
         getDeliveryId,
         valid_driver_assistant,
         valid_driver,
         setDeliveryAssignment,
         allorders,
         add_tripId,
         viewtrainShedule,
         set_Deliveries,
         view_customer_id,
         sec_04_report,
         sec_02_report,
         view_Driver_assist_id,
         view_Driver_id,
         view_truck_id,
         driver_assist_report,
         driver_report,
         sec_01_first_quater_report,
         sec_01_second_quater_report,
         sec_01_third_quater_report,
         sec_01_fourth_quater_report,
         //truck_report
        } from './database.js'
var app = express();
app.use(express.json())
import cors from 'cors'
//Enable cors

app.use(
  cors({
    exposedHeaders: ["Content-Length","X-Foo","X-Bar"],
    credentials: true,
    origin:"*",
  })
);

var HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});



app.get("/api/products", async (req, res, next) => {
    const products = await getProducts()
    res.json({message:"success",
                data: products,});
    
  });

  app.get("/api/products/route", async (req, res, next) => {
    const routes = await getRoute()
    res.json({message:"success",
                data: routes,});
    
  });

  app.post("/api/login",async (req, res, next) => {

    try {
        var errors = []

        if (!req.body) {
            errors.push("An invalid input");
        }

        const [user] = await getUserType(req.body.name,req.body.Password)
        console.log(user)

        
        res.status(201).json({
          massege:"success",
          userType:user,
        })
        
    } catch (E) {
        res.status(400).send(E);
    }
});

app.post("/api/getcustomer",async (req, res, next) => {

  try {
      var errors = []

      if (!req.body) {
          errors.push("An invalid input");
      }

      const [user] = await getCustomer(req.body.User_Id)
      res.status(201).json({
        massege:"success",
        customer_id:user.customer_id
      })
      
  } catch (E) {
      res.status(400).send(E);
  }
});


app.post("/api/addorder",async (req, res, next) => {

  try {
      var errors = []

      if (!req.body) {
          errors.push("An invalid input");
      }
      console.log(req.body)
      const [type] = await addorder(req.body.route_id,req.body.ordered_date,req.body.customer_id,req.body.expected_date,req.body.Status,req.body.City)
      console.log(type)
      res.status(201).json({
        massege:"success",
        order_id:type.last_id
      })
      
  } catch (E) {
      res.status(400).send(E);
  }
});

app.post("/api/productlist",async (req, res, next) => {

  try {
      var errors = []

      if (!req.body) {
          errors.push("An invalid input");
      }
      console.log(req.body)
      await toProductList(req.body.product.product_id,req.body.order_id,req.body.quantity)
      res.status(200)
      
  } catch (E) {
      res.status(400).send(E);
  }
});
  


app.post("/api/myorders", async (req, res, next) => {
  try {
    var errors = [];

    if (!req.body) {
      errors.push("An invalid input");
    }
    console.log(req.body.id)
    const view = await customer_view(req.body.id);

    // Format date values before sending in the response
    const formattedView = view.map(item => ({
      order_id: item.order_id,
      ordered_date: new Date(item.ordered_date).toLocaleDateString(), // Format date as per your preference
      expected_date: new Date(item.expected_date).toLocaleDateString(), // Format date as per your preference
      status: item.Status
    }));
    
    console.log(formattedView)
    res.status(201).json({
      message: "success",
      data: formattedView
    });
    
  } catch (E) {
    res.status(400).send(E);
    console.log(E)
  }
});

app.get("/api/allorders", async (req,res, next) => {
  try {
   
    const view = await allorders();

    // Format date values before sending in the response
    const formattedView = view.map(item => ({
      order_id: item.order_id,
      ordered_date: new Date(item.ordered_date).toLocaleDateString(), // Format date as per your preference
      expected_date: new Date(item.expected_date).toLocaleDateString(), // Format date as per your preference
      status: item.Status
    }));
    
   
    res.status(201).json({
      message: "success",
      data: formattedView
    });
    
  } catch (E) {
    res.status(400).send(E);
    console.log(E)
  }
});
  

app.post("/api/assignments",async (req, res, next) => {

  try {
      var errors = []

      if (!req.body) {
          errors.push("An invalid input");
      }
      console.log(req.body,"function called")
      const rows= await delivary_assignments(req.body.user_id);
      console.log(rows)
      res.status(201).json({
        message: "success",
        data: rows
      }
        );
  } catch (E) {
      res.status(400).send(E);
  }
});


app.post("/api/getDelivery_View",async (req, res, next) => {

  try {
      var errors = []

      if (!req.body) {
          errors.push("An invalid input");
      }
      console.log(req.body,'DELIVERY')
      const Driver = await getDrivers(req.body.user_id)
      const DriverAssistant=await getDriverAssistants(req.body.user_id)
      const Truck=await getTrucks(req.body.user_id)
      const Delivery_id=await getDeliveryId(req.body.user_id)
      
      res.status(201).json({
       
        drivers : Driver,
        assists : DriverAssistant,
        trucks : Truck,
        delivery : Delivery_id,
       
      })
      
  } catch (E) {
      res.status(400).send(E);
  }
});


app.post("/api/valid_driver_assistant", async (req, res, next) => {
  try {
    var errors = [];

    if (!req.body) {
      errors.push("An invalid input");
    }

    const valid = await valid_driver_assistant(req.body.driverAssist_id, req.body.user_id, req.body.date);

    if (valid.length > 0 && valid[0][Object.keys(valid[0])[0]] === 1) {
      // Check if the first row contains a boolean value of 1
      res.status(201).json({
        validS: true, // Set to true if the boolean value is 1
      });
    } else {
      res.status(201).json({
        validS: false, // Set to false if the boolean value is not 1
      });
    }
  } catch (E) {
    res.status(400).send(E);
  }
});




app.post("/api/valid_driver", async (req, res, next) => {
  try {
    var errors = [];

    if (!req.body) {
      errors.push("An invalid input");
    }

    const valid = await valid_driver(req.body.driver_id, req.body.user_id, req.body.date);

    if (valid.length > 0 && valid[0][Object.keys(valid[0])[0]] === 1) {
      // Check if the first row contains a boolean value of 1
      res.status(201).json({
       
        validS: true, // Set to true if the boolean value is 1
      });
    } else {
      res.status(201).json({
        validS: false, // Set to false if the boolean value is not 1
      });
    }
  } catch (E) {
    res.status(400).send(E);
  }
});

app.post("/api/setDeliveryAssignment",async (req, res, next) => {

  try {
      var errors = []
    console.log(req.body)
      if (!req.body) {
          errors.push("An invalid input");
      }
     
     await setDeliveryAssignment(req.body.truck_id,req.body.driver_id,req.body.assist_id,req.body.date,req.body.delivery_id,)
    
      res.status(201).json({
        massage:"success",
       

       
      })
      
  } catch (E) {
      res.status(400).send(E);
  }
});

app.post("/api/update_trip",async (req, res, next) => {

  try {
      var errors = []

      console.log("Setting new Trip")
      const valid = await add_tripId (req.body.trip_id, req.body.date, req.body.capacity,req.body.start_station_id);

      res.status(201).json({
        massage:"success",
        Trips : valid,
       
      })
      
  } catch (E) {
      res.status(400).send(E);
  }
});

app.get("/api/get_trips", async (req, res, next) => {
  
  const shedule = await viewtrainShedule()
  res.json(shedule);
  
});

app.post("/api/addOrdersToTrain",async (req, res, next) => {

  try {
      var errors = []

      if (!req.body) {
          errors.push("An invalid input");
      }
      console.log(req)
      const Delivery_ID = await set_Deliveries(req.body.order_id)

      res.status(201).json({
        massage:"success",
        data:Delivery_ID
       
      })
      
  } catch (E) {
      res.status(400).send(E);
  }
});

app.get("/api/get-customers", async (req, res, next) => {
  
  const customers = await view_customer_id()
  console.log(customers)
  res.json(customers);
  
});

app.post("/api/report4", async (req, res, next) => {
  
  const products = await sec_04_report(req.body.customer_id)
  console.log(products)
  res.json({"data":products});
  
});

app.get("/api/report2", async (req, res, next) => {
  console.log("get products");
  const products = await sec_02_report()
  console.log(products)
  res.json({"data":products});
  
});

app.get("/api/get-drivers", async (req, res, next) => {
  
  const drivers = await view_Driver_id()
  console.log(drivers)
  res.json(drivers);
  
});
app.get("/api/get-assists", async (req, res, next) => {
  
  const driver_assist = await view_Driver_assist_id()
  res.json( driver_assist);
  
});
app.get("/api/get-trucks", async (req, res, next) => {
  
  const trucks = await view_truck_id()
  res.json(trucks);
  
});

app.post("/api/driver_report", async (req, res, next) => {
  console.log(req.body.driver_id)
  const report = await driver_report(req.body.driver_id)
  console.log(report)
  res.json(report);
  
});

app.post("/api/driver_assist_report", async (req, res, next) => {
  
  const report = await driver_assist_report(req.body.driver_assist_id)
  console.log(report)
  res.json(report);
  
});

app.post("/api/truck_report", async (req, res, next) => {
  
  //const report= await truck_report(req.body.truck_id)
 // console.log(report)
//res.json(report);
  
});

app.post("/api/report1", async (req, res, next) => {
  
  const first = await sec_01_first_quater_report(req.body.year)
  const second= await sec_01_second_quater_report(req.body.year)
  const third=await sec_01_third_quater_report(req.body.year)
  const fourth=await sec_01_fourth_quater_report(req.body.year)
  res.json({message:"success",
              data1: first,
              data2: second,
              data3: third,
              data4:fourth
            
            });
  
});