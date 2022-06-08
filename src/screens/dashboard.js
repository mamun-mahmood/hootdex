import React from 'react'
import { Funnel, FunnelChart, LabelList, Legend, Pie, PieChart, RadialBar, RadialBarChart, Tooltip } from 'recharts'

export default function Dashboard({user}) {
const assets=[{name:'XMG',coins:4},{name:"PECU",coins:4}]
    const xmgData = [
        {name: 'acc1', coins: 1},
        {name: 'acc2', coins: 3},
        {name: 'acc3', coins: 1},
        {name: 'acc4', coins: 2},
        {name: 'acc5', coins: 0.4},
        {name: 'acc6', coins: 0.2},
        {name: 'acc7', coins: 0.4},
        
      ];
      const pecuData = [
        {name: 'acc1', coins: 0.4},
        {name: 'acc2', coins: 0.2},
        {name: 'acc3', coins: 0.4},
        {name: 'acc4', coins: 1},
        {name: 'acc5', coins: 3},
        {name: 'acc6', coins: 1},
        {name: 'acc7', coins: 2},
     
        
      ];

      const accessEmails=['maxme@gmail.com','officialaakashbhardwaj@gmail.com',
      'info@megahoot.com',
      'hortonglobalindustries@gmail.com' ,
      'ucwent@gmail.com' , 
      'info@ucwe.com' , 
      'megahootinc@gmail.com' , 
      'louis@falconglobalacquisitions.com',
      'info@falconglobalacquisitions.com' , 
      'acc1@falconglobalacquisitions.com',
      'acc2@falconglobalacquisitions.com',
      'acc3@falconglobalacquisitions.com',
      'acc4@falconglobalacquisitions.com',
      'acc5@falconglobalacquisitions.com',
      'acc6@falconglobalacquisitions.com',
      'acc7@falconglobalacquisitions.com',
      'acc8@falconglobalacquisitions.com',
      'acc9@falconglobalacquisitions.com']
  return (
    <div className='screen' style={{color:'#ffffff'}}>
       {user?<div>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}> <h3>Welcome {user.username}</h3>
           <h3>Pool Level: Tier {0}</h3>
           {accessEmails.includes(user.email)&&<><h4>Total Coins :{4}b</h4>
          <h4>Total XMG:{4}b</h4></>}
           
          </div>
          {accessEmails.includes(user.email)&&<>
            <div style={{display:'flex',flexDirection:'row'}}> <PieChart width={600} height={600}>
          <Pie data={xmgData} dataKey="coins" nameKey={'name'} innerRadius={200} outerRadius={250} fill="orange" label />
          <Pie data={pecuData} dataKey="coins" nameKey={'name'} innerRadius={110}  outerRadius={150} fill="blue" label />
          <Pie data={assets} dataKey="coins" nameKey={'name'}  outerRadius={50} fill="green" label />
        </PieChart><div> <h5 style={{color:'orange'}}>XMG DISTRIBUTION :orange</h5>
        <h5 style={{color:'blue'}}>PECU DISTRIBUTION :blue</h5>
        <h5 style={{color:'green'}}>XMG/PECU DISTRIBUTION :green</h5></div></div> 
           </>}
         
         
        
           </div>:null}
     

    </div>
  )
}
