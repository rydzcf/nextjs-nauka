import { type NextRequest } from 'next/server';
import { Product } from "@/app/interfaces/api";

interface QueryParams {
  [key: string] : string
}

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Utworzenie obiektu do przechowywania wszystkich parametrów zapytania
  const queryParams: QueryParams = {};

  // Iteracja po wszystkich parametrach zapytania i dodanie ich do obiektu queryParams
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });


  const data = [
    {
        "name": "Z01",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "height": 116,
        "index": "Z01-1-16S181"
      },
    {
        "name": "Z01",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "height": 116,
        "index": "Z01-1-16S161"
      },
    {
        "name": "Z02",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "height": 126,
        "index": "Z02-2-16S181"
      },
    {
        "name": "Z02",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "height": 126,
        "index": "Z02-2-16S161"
      },
    {
        "name": "Z03",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "height": 136,
        "index": "Z03-1-16S161"
      },
    {
        "name": "Z03",
        "category": "header",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 140,
        "height": 136,
        "index": "Z03-1-14S141"
      },
    {
        "name": "BOX1",
        "category": "bed",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "index": "BOX1-1-1620",
        "addons": ["leg"]
      },
    {
        "name": "BOX2",
        "category": "bed",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "index": "BOX2-1-1620",
        "addons": ["leg", "frame", "boxElem"]
      },
    {
        "name": "BOX3",
        "category": "bed",
        "photo": "sl03-p.jpg",
        "price": 99999,
        "size": 160,
        "index": "BOX3-1-1620",
      },


    {
        "name": "noga do BOX3 i Box1",
        "category": "leg",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "NOG-1",
        "fit" : ["BOX3", "BOX1"]
      },
    {
        "name": "noga do wszytkiego",
        "category": "leg",
        "photo": "sl03-p.jpg",
        "price": 9999,
        "size": 160,
        "index": "NOG do wszy",
        "fit" : []
      }
    ]

    if (queryParams.id) {
      const item = data.filter(elem => elem.index === queryParams.id);
      return new Response(JSON.stringify(item.length > 0 ? item : null), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  
    // Filtrowanie danych na podstawie pozostałych parametrów
    const filteredData = data.filter(obj => 
      (!queryParams.size || obj.size === Number(queryParams.size)) &&
      (!queryParams.category || obj.category === queryParams.category) &&
      (!queryParams.cover || obj.index.includes(`-${queryParams.cover}-`))
    );
  
    return new Response(JSON.stringify(filteredData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
// import { type NextRequest } from 'next/server';
// import { Product } from "@/app/interfaces/api";

// interface QueryParams {
//   [key: string] : string
// }

// export function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
  
//   // Utworzenie obiektu do przechowywania wszystkich parametrów zapytania
//   const queryParams: QueryParams = {};

//   // Iteracja po wszystkich parametrach zapytania i dodanie ich do obiektu queryParams
//   searchParams.forEach((value, key) => {
//     queryParams[key] = value;
//   });


//   const data = [
//     {
//         "name": "Z01",
//         "category": "header",
//         "photo": "sl03-p.jpg",
//         "price": 99999,
//         "size": 160,
//         "height": 116,
//         "index": "Z01-1-16S181"
//       },
//     {
//         "name": "Z01",
//         "category": "header",
//         "photo": "sl03-p.jpg",
//         "price": 99999,
//         "size": 160,
//         "height": 116,
//         "index": "Z01-1-16S161"
//       },
//     {
//         "name": "Z02",
//         "category": "header",
//         "photo": "sl03-p.jpg",
//         "price": 99999,
//         "size": 160,
//         "height": 126,
//         "index": "Z02-2-16S181"
//       },
//     {
//         "name": "Z02",
//         "category": "header",
//         "photo": "sl03-p.jpg",
//         "price": 99999,
//         "size": 160,
//         "height": 126,
//         "index": "Z02-2-16S161"
//       },
//     {
//         "name": "Z03",
//         "category": "header",
//         "photo": "sl03-p.jpg",
//         "price": 99999,
//         "size": 160,
//         "height": 136,
//         "index": "Z03-1-16S161"
//       },
//     {
//         "name": "Z03",
//         "category": "header",
//         "photo": "sl03-p.jpg",
//         "price": 99999,
//         "size": 140,
//         "height": 136,
//         "index": "Z03-1-14S141"
//       },
//     {
//         "name": "BOX1",
//         "category": "bed",
//         "photo": "sl03-p.jpg",
//         "price": 99999,
//         "size": 160,
//         "index": "BOX1-1-1620",
//         "addons": ["leg"]
//       },
//     {
//         "name": "BOX2",
//         "category": "bed",
//         "photo": "sl03-p.jpg",
//         "price": 99999,
//         "size": 160,
//         "index": "BOX2-1-1620",
//         "addons": ["leg", "frame", "boxElem"]
//       },
//     {
//         "name": "BOX3",
//         "category": "bed",
//         "photo": "sl03-p.jpg",
//         "price": 99999,
//         "size": 160,
//         "index": "BOX3-1-1620",
//       },


//     {
//         "name": "noga do BOX3 i Box1",
//         "category": "leg",
//         "photo": "sl03-p.jpg",
//         "price": 9999,
//         "size": 160,
//         "index": "NOG-1",
//         "fit" : ["BOX3", "BOX1"]
//       }
//     ]

//     if(queryParams.id) {
//       const item = data.filter(elem => elem.index === queryParams.id)
//       if (item) {
//         return new Response(JSON.stringify(item), {
//           status: 200,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//       }
//     } else new Response(null, {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });


//     const filteredData = data
//     .filter((obj: Product) => {
//         return (!queryParams.size || obj.size === Number(queryParams.size)) && 
//         (!queryParams.cover || obj.index.includes(`-${queryParams.cover}-`) &&
//         (!queryParams.category || obj.category === queryParams.category))
//     })

  

//   return new Response(JSON.stringify(filteredData), {
//     status: 200,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }
