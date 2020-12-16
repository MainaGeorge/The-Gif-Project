using AutoMapper;
using GifApi.Models;
using GifApi.ViewModels;

namespace GifApi.Mapping
{
    public class Maps : Profile

    {
        public Maps()
        {
            CreateMap<AppUserModel, UserDto>();
        }
    }
}
