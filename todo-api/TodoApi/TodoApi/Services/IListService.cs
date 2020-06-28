using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;

namespace TodoApi.Services
{
    public interface IListService
    {
        List<ToDoList> Get();
        ToDoList Get(string id);
        ToDoList Create(ToDoList list);
        void Update(string id, ToDoList updatedList);
        void Remove(ToDoList listToRemove);
        void Remove(string id);

    }
}
