using System;
using System.Collections.Generic;
using System.Text;
using TodoApi.Models;

namespace TodoApi.Test
{
    class TestData
    {
        public static List<ToDoList> TodoListData()
        {            
            var lists = new List<ToDoList>
            {
                new ToDoList{Id="1",Name="Chores", Items=new List<Item> {
                    new Item{Id=0, Name="Laundry", IsChecked=false},
                    new Item{Id=1, Name="Dishes", IsChecked=true},
                    } 
                },
                new ToDoList{Id="2",Name="Work", Items=new List<Item> {
                    new Item{Id=0, Name="Code", IsChecked=false},
                    new Item{Id=1, Name="Submit PR", IsChecked=true},
                    }
                },
            };

            return lists;
        }

        public static List<ToDoList> MongoData()
        {
            var lists = new List<ToDoList>
            {
                new ToDoList{Id="1",Name="Chores", Items=new List<Item> {
                    new Item{Id=0, Name="Laundry", IsChecked=false},
                    new Item{Id=1, Name="Dishes", IsChecked=true},
                    }
                },
                new ToDoList{Id="2",Name="Work", Items=new List<Item> {
                    new Item{Id=0, Name="Code", IsChecked=false},
                    new Item{Id=1, Name="Submit PR", IsChecked=true},
                    }
                },
            };

            return lists;
        }
    }
}
