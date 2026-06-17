<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteContent extends Model
{
    use HasFactory;

    protected $table = 'site_content';
    public $timestamps = false;

    protected $fillable = [
        'key',
        'value',
        'page',
        'label'
    ];
}
