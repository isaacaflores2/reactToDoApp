using TodoApi.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;


namespace TodoApi.Services
{
    public class ListService : IListService
    {
        private readonly IMongoCollection<ToDoList> lists;

        public ListService()
        {
            lists = null;
        }

        public ListService(IToDoDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var db = client.GetDatabase(settings.DatabaseName);
            lists = db.GetCollection<ToDoList>(settings.ListCollectionName);
        }

        public List<ToDoList> Get() =>
            lists.Find(list => true).ToList();

        public ToDoList Get(string id) =>
            lists.Find(list => list.Id == id).FirstOrDefault();

        public ToDoList Create(ToDoList list)
        {
            lists.InsertOne(list);
            return list;
        }

        public void Update(string id, ToDoList updatedList)
        {
            lists.ReplaceOne(list => list.Id == id, updatedList);
        }

        public void Remove(ToDoList listToRemove)
        {
            lists.DeleteOne(list => list.Id == listToRemove.Id);
        }

        public void Remove(string id)
        {
            lists.DeleteOne(list => list.Id == id);

        }

    }
}
