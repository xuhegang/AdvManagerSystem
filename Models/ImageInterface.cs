using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AdvManagerSystem.Models
{
    public interface ImageDbInterface
    {
        IDbSet<Image> GetDb();
        int SaveChanges();
    }
}