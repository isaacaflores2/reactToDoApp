using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TodoApi.Models
{
    [BsonIgnoreExtraElements]
    public class Item
    {        
        public int Id { get; set; }

        public string Name { get; set; }

        public bool isChecked { get; set; }
    }
}
