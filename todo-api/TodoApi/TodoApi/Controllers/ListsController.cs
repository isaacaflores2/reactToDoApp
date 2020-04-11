using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TodoApi.Models;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private readonly ListService listService;

        public ListsController(ListService listService)
        {
            this.listService = listService;
        }

        [HttpGet]
        public ActionResult<List<ToDoList>> Get() =>
            listService.Get();

        [HttpGet("{id:length(24)}", Name = "GetList")]
        public ActionResult<ToDoList> Get(string id)
        {
            var list = listService.Get(id);

            if(list == null)
            {
                return NotFound();
            }

            return list;
        }

        [HttpPost]
        public ActionResult<ToDoList> Create(ToDoList list)
        {
            listService.Create(list);

            return CreatedAtRoute("GetBook", new {id=list.Id.ToString()}, list);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, ToDoList updatedList)
        {
            var list = listService.Get(id);

            if( list == null)
            {
                return NotFound();
            }

            listService.Update(id, updatedList);

            return NoContent();
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var list = listService.Get(id);

            if (list == null)
            {
                return NotFound();
            }

            listService.Remove(list.Id);

            return NoContent();
        }
    }
}
