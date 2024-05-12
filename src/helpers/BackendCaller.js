const MockData = {
  "shoplist/list": {
    itemList: [
      { name: "list1", ownerId: 234, doneParts: 4, totalParts: 6, id: 1, archived: false },
      { name: "list2", ownerId: 123, doneParts: 3, totalParts: 12, id: 1, archived: true }
    ]
  },
  "shoplist/create": {
    id: 1,
    name: "Get Dejved"
  },
  "shoplist/detail": {
    data: {
      ownerId: 234,
      listName: "Dave's List",
      itemList: [
        {
          caption: "Item 1",
          done: false
        }
      ],
      memberList: [234]
    }
  },
  "shoplist/update": {
    data: {
      ownerId: 234,
      listName: "Dave's List",
      itemList: [
        {
          caption: "Item 1",
          done: true
        },
        {
          caption: "The EVIL Beam",
          done: false
        }
      ],
      memberList: [234]
    }
  },
  "management/update": {
    data: {
      ownerId: 234,
      listName: "Dave's List of Evil",
      itemList: [
        {
          caption: "Item 1",
          done: true
        },
        {
          caption: "The EVIL Beam",
          done: false
        }
      ],
      memberList: [234, 123]
    }
  },
  "management/leave": {
    sucess: true
  },
  "management/archive": {data: {
    ownerId: 234,
    archived: true,
    listName: "Dave's List of Evil",
    itemList: [
      {
        caption: "Item 1",
        done: true
      },
      {
        caption: "The EVIL Beam",
        done: false
      }
    ],
    memberList: [234, 123]
  }
  },
  "management/delete": {
    sucess: true
  }

}

const useMockData = true;
const delay = 1000;

async function DelayMockDataResponse(callKey) {
  await new Promise(r => setTimeout(r, delay));
  if (MockData[callKey.toLowerCase()]) {
    return MockData[callKey.toLowerCase()]
  }
  else {
    console.log(`Requested resource ${callKey.toLowerCase()} that wans't found in mock data`)
    return { error: `Requested resource not found` }
  }
}



async function Call(Uri, Method, RequestBody = undefined) {
  if (useMockData) {
    const callKey = Uri.replace(/https*:\/\/.*?\//g, "");
    return await DelayMockDataResponse(callKey)
  }
  else {
    const callData = {
      method: Method,
    }
    if (RequestBody) {
      callData.headers = {
        "Content-Type": "application/json",
      };
      callData.body = JSON.stringify(RequestBody);
    }
    return await fetch(Uri, callData)
      .then(async (response) => {
        return await response.json();
      })
      .catch(async (error) => {
        return { error: error.message }
      });
  }



}


export default Call;