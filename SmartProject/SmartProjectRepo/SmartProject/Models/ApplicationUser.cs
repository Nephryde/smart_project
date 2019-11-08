﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class ApplicationUser : IdentityUser
    {
        public UserBasicInfo UserBasic { get; set; }
    }
}
